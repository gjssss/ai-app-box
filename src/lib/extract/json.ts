/**
 * 从字符串中提取所有由 ```json 包裹的 JSON 代码块
 * @param content 包含 Markdown 的原始字符串
 * @returns 提取出的 JSON 字符串数组
 */
export function extractJSONCodeBlocks(content: string): string[] {
  // 正则表达式说明：
  // - 使用非贪婪匹配 (.*?) 防止跨代码块匹配
  // - [\s\S]* 匹配包括换行的任意字符
  // - \s* 处理标记前后的空格
  // eslint-disable-next-line regexp/no-super-linear-backtracking
  const codeBlockRegex = /```json\s*?\n([\s\S]*?)\s*```/g

  const matches: string[] = []
  let match

  // eslint-disable-next-line no-cond-assign
  while ((match = codeBlockRegex.exec(content)) !== null) {
    // match[1] 是第一个捕获组（代码块内容）
    const rawContent = match[1].trim()
    if (rawContent.length > 0) {
      matches.push(rawContent)
    }
  }

  return matches
}
