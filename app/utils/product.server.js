import { prisma } from '../db.server';

export async function getAllProducts() {
  return prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function addProduct(data) {
  return prisma.product.create({ data });
}

export async function deleteProduct(id) {
  return prisma.product.delete({ where: { id } });
}
