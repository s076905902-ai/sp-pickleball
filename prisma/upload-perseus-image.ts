import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const BLOB_TOKEN = "vercel_blob_rw_KTeAVo89Jvm3QCmB_wRtxNpD6H4ThHoi1x5yIQtuXalmQW2";
const IMAGE_URL =
  "https://cdn11.bigcommerce.com/s-tl5mxjzfsl/images/stencil/1000x1000/products/6595/34982/JLA215_JOOLAPerseusProIV_16mm_1_1000__17923.1759947392.jpg?c=1";

async function main() {
  console.log("⬇️  下載圖片中...");
  const imgRes = await fetch(IMAGE_URL);
  if (!imgRes.ok) throw new Error(`下載失敗: ${imgRes.status}`);
  const buffer = await imgRes.arrayBuffer();

  console.log("☁️  上傳到 Vercel Blob...");
  const uploadRes = await fetch(
    "https://blob.vercel-storage.com/products/joola-perseus-16mm-main.jpg",
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${BLOB_TOKEN}`,
        "x-content-type": "image/jpeg",
        "x-add-random-suffix": "1",
      },
      body: Buffer.from(buffer),
    }
  );

  if (!uploadRes.ok) {
    const text = await uploadRes.text();
    throw new Error(`Blob 上傳失敗: ${uploadRes.status} ${text}`);
  }

  const blobData = (await uploadRes.json()) as { url: string };
  const blobUrl = blobData.url;
  console.log(`✅ Blob URL: ${blobUrl}`);

  // 找 Perseus 商品
  const product = await prisma.product.findFirst({
    where: { name: { contains: "Perseus", mode: "insensitive" } },
  });

  if (!product) {
    throw new Error("找不到 Perseus 商品");
  }

  await prisma.product.update({
    where: { id: product.id },
    data: { mainImage: blobUrl },
  });

  console.log(`✅ 已更新 "${product.name}" 主圖`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
