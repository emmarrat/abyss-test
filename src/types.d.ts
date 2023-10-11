export interface TreeNode {
  id: string;
  text: string;
  isSubmitted: boolean;
  children?: TreeNode[];
  root?:boolean;
}

export interface Zoom {
  title: string;
  value: string;
}