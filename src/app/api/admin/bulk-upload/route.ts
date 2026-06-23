import { parse } from "csv-parse/sync";
import { type NextRequest } from "next/server";
import { handleApiError, ok } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { assertCsrf } from "@/lib/csrf";
import { prisma } from "@/lib/prisma";

type CsvProduct = {
  name: string;
  slug: string;
  sku: string;
  categorySlug: string;
  description: string;
  price: string;
  mrp?: string;
  inventory?: string;
  images: string;
};

export async function POST(request: NextRequest) {
  try {
    await requireAdmin(request);
    assertCsrf(request);
    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) throw new Error("CSV file is required");
    const text = await file.text();
    const records = parse(text, { columns: true, skip_empty_lines: true, trim: true }) as CsvProduct[];

    const result = await prisma.$transaction(async (tx) => {
      const upserted = [];
      for (const record of records) {
        const category = await tx.category.upsert({
          where: { slug: record.categorySlug },
          update: {},
          create: {
            name: record.categorySlug
              .split("-")
              .map((part) => part[0]?.toUpperCase() + part.slice(1))
              .join(" "),
            slug: record.categorySlug
          }
        });
        upserted.push(
          await tx.product.upsert({
            where: { slug: record.slug },
            update: {
              name: record.name,
              sku: record.sku,
              description: record.description,
              price: record.price,
              mrp: record.mrp,
              inventory: Number(record.inventory ?? 0),
              images: record.images.split("|").map((image) => image.trim()),
              categoryId: category.id
            },
            create: {
              name: record.name,
              slug: record.slug,
              sku: record.sku,
              description: record.description,
              price: record.price,
              mrp: record.mrp,
              inventory: Number(record.inventory ?? 0),
              images: record.images.split("|").map((image) => image.trim()),
              categoryId: category.id
            }
          })
        );
      }
      return upserted;
    });

    return ok({ imported: result.length });
  } catch (error) {
    return handleApiError(error);
  }
}
