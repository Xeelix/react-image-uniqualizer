export interface ImagePairInterface {
  original: string;
  processed: string;
  name: string;
}

export interface UniqualizationSettingsForm {
  copies: number;
  folderSrtucture: "oneFolder" | "subfolders" | "eachFolder";
  naming: "hash" | "sequential" | "original";
  prefix: string;
  saveNamesList: boolean;
  rightNumbering: boolean;
  rotation: {
    enabled: boolean;
    min: number;
    max: number;
  };
  crop: {
    enabled: boolean;
    side: "random" | "top" | "bottom" | "left" | "right";
    min: number;
    max: number;
  };
  saturation: {
    enabled: boolean;
    min: number;
    max: number;
  };
  brightness: {
    enabled: boolean;
    min: number;
    max: number;
  };
  contrast: {
    enabled: boolean;
    min: number;
    max: number;
  };
  reflection: "none" | "horizontal" | "vertical" | "both";
  noise: {
    enabled: boolean;
    max: number;
  };
  metadata: boolean;
}
