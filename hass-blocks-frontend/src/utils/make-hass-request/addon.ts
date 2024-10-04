interface Addon {
  name: string;
  slug: string;
  description: string;
  advanced: boolean;
  stage: string;
  version: string;
  version_latest: string;
  update_available: boolean;
  available: boolean;
  detached: boolean;
  homeassistant: null;
  state: string;
  repository: string;
  build: true;
  url: null;
  icon: false;
  logo: false;
  system_managed: false;
}

export interface AddonsResponse {
  data: {
    addons: Addon[];
  };
}
