import { getPlaiceholder } from "plaiceholder";

export const blurUrlCreator = async (src: string): Promise<string> => {
    // "use server"
    const res = await fetch(src)
    const buffer = Buffer.from(await res.arrayBuffer())
    const { base64 } = await getPlaiceholder(buffer);

    return base64;
}