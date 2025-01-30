export interface AsanaWorkspace {
  gid: string;
  name: string;
  resource_type: 'workspace';
}

export interface AsanaProject {
  gid: string;
  name: string;
  notes: string;
  resource_type: 'project';
  workspace: {
    gid: string;
    name: string;
    resource_type: 'workspace';
  };
}

export interface AsanaSection {
  gid: string;
  name: string;
  resource_type: 'section';
  project: {
    gid: string;
    name: string;
    resource_type: 'project';
  };
}

export interface AsanaTask {
  gid: string;
  name: string;
  notes: string;
  completed: boolean;
  due_on: string | null;
  resource_type: 'task';
  memberships: Array<{
    project: {
      gid: string;
      name: string;
      resource_type: 'project';
    };
    section: {
      gid: string;
      name: string;
      resource_type: 'section';
    };
  }>;
  assignee: {
    gid: string;
    name: string;
    email: string;
    resource_type: 'user';
  } | null;
  tags: Array<{
    gid: string;
    name: string;
    color: string;
    resource_type: 'tag';
  }>;
}

export interface AsanaUser {
  gid: string;
  name: string;
  email: string;
  resource_type: 'user';
  photo: {
    image_21x21: string;
    image_27x27: string;
    image_36x36: string;
    image_60x60: string;
    image_128x128: string;
  } | null;
}

export interface AsanaTag {
  gid: string;
  name: string;
  color: string | null;
  resource_type: 'tag';
  workspace: {
    gid: string;
    name: string;
    resource_type: 'workspace';
  };
}