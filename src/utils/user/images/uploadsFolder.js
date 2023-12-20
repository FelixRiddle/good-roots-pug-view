import path from "node:path";

export default function uploadsFolder() {
    const uploadsFolderPath = path.resolve(process.cwd(), 'public/uploads');
    return uploadsFolderPath;
}
