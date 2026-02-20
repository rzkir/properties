export const AI_GENERATE_ALL_SYSTEM =
    "Kamu adalah asisten penulis artikel. Balas hanya dengan isi artikel dalam HTML atau teks berformat, tanpa bagian lain seperti judul, deskripsi, gambar, atau tag.";

export function parseGeneratedSections(text: string): {
    content: string;
} {
    const content = text.trim();
    return {
        content,
    };
}

export function cleanMarkdownCodeBlocks(content: string): string {
    return content
        .replace(/```[\w]*\n?([\s\S]*?)```/g, "$1")
        .replace(/```/g, "")
        .trim();
}