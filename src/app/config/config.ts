export type ApiTableRec = {
  id: number;
  gtin: number;
  product_name: string;
  product_desc: string;
  price: number;
  currency: string;
  category: string;
  gender: string;
  quantity: number;
  size: string;
  style: string;
  color: string;
  url: string;
  image: string;
  image_additional: string;
  additional: string;
  source_video: string;
};

export type AppTableRec = Omit<
  ApiTableRec,
  'product_name' | 'product_desc' | 'image_additional' | 'source_video'
> & {
  productName: string;
  productDescription: string;
  imageAdditional: string;
  sourceVideo: string;
};

export interface TApi {
  [id: string]: ApiTableRec;
}

export const Names: Record<string, keyof AppTableRec> = {
  id: 'id',
  gtin: 'gtin',
  Price: 'price',
  Currency: 'currency',
  Category: 'category',
  Gender: 'gender',
  'Product Name': 'productName',
  'Product Description': 'productDescription',
  Additional: 'additional',
  'Additional image': 'imageAdditional',
  Quantity: 'quantity',
  url: 'url',
  size: 'size',
  'Source Video': 'sourceVideo',
};

export type TNames = typeof Names;

export type TApiData = TApi;
export type TAppData = AppTableRec[];

export const serializer = (data: TApiData): TAppData =>
  Object.values(data).map((rec) => ({
    id: rec.id,
    gtin: rec.gtin,
    productName: rec.product_name,
    productDescription: rec.product_desc,
    price: rec.price,
    currency: rec.currency,
    category: rec.category,
    additional: rec.additional,
    imageAdditional: rec.image_additional,
    image: rec.image,
    gender: rec.gender,
    sourceVideo: rec.source_video,
    quantity: rec.quantity,
    size: rec.size,
    style: rec.style,
    color: rec.color,
    url: rec.url,
  }));
