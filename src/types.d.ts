export   interface TreeNode {
  id: string;
  text: string;
  diamond: boolean;
  children?: TreeNode[];
}