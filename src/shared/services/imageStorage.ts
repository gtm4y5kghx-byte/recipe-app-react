import { Paths, File, Directory } from "expo-file-system";
import { ImageManipulator, SaveFormat } from "expo-image-manipulator";

const IMAGE_DIR = new Directory(Paths.document, "recipe-images");
const MAX_HEIGHT = 900;
const JPEG_QUALITY = 0.8;

const ensureDirectoryExists = (): void => {
  if (!IMAGE_DIR.exists) IMAGE_DIR.create();
};

const generateFilename = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.jpg`;
};

export const imageStorage = {
  async downloadAndSave(url: string): Promise<string> {
    ensureDirectoryExists();

    const tempFile = new File(Paths.cache, `temp-${Date.now()}.jpg`);
    const downloaded = await File.downloadFileAsync(url, tempFile);

    const context = ImageManipulator.manipulate(downloaded.uri);
    const imageRef = await context.resize({ height: MAX_HEIGHT }).renderAsync();
    const resized = await imageRef.saveAsync({
      format: SaveFormat.JPEG,
      compress: JPEG_QUALITY,
    });

    const filename = generateFilename();
    const destination = new File(IMAGE_DIR, filename);
    const resizedFile = new File(resized.uri);
    resizedFile.move(destination);

    return destination.uri;
  },

  deleteImage(uri: string): void {
    const file = new File(uri);
    if (file.exists) file.delete();
  },

  deleteAllImages(): void {
    if (IMAGE_DIR.exists) IMAGE_DIR.delete();
  },
};
