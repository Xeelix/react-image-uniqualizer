import JSZip from "jszip";

self.onmessage = async (event) => {
  try {
    const { files, saveNames, namesList } = event.data;
    const zip = new JSZip();

    for (const item of files) {
      if (item.folder) {
        const folder = zip.folder(item.folder);
        folder?.file(item.fileName, item.blob);
      } else {
        zip.file(item.fileName, item.blob);
      }
    }

    if (saveNames && namesList) {
      zip.file("names_list.txt", namesList);
    }

    const content = await zip.generateAsync(
      { type: "blob", compression: "STORE" },
      (metadata) => {
        self.postMessage({
          progress: metadata.percent.toFixed(1),
          currentFile: metadata.currentFile,
        });
      }
    );

    self.postMessage({ blob: content });
  } catch (error: any) {
    self.postMessage({ error: error.message });
  }
};