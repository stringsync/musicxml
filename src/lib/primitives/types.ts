import * as schema from '../schema';

export type PrimitiveChild = Extract<schema.DescriptorChild, string | number | schema.Descriptor>;
