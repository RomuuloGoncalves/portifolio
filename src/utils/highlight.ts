// Classes: c comentário, s string, n número, k palavra-chave, t tipo, f função, p propriedade (cores em palette.css).
const TOKEN = /(\/\/.*$)|('[^']*'|"[^"]*"|`[^`]*`)|\b(\d+(?:\.\d+)?)\b|\b(const|let|await|async|return|if|throw|try|catch|finally|export|class|new|function|implements|private|constructor|import|from|of|in)\b|\b([A-Z][A-Za-z0-9_]*)\b|(\$?[A-Za-z_][\w$]*)(?=\s*\()|(?<=\.)([A-Za-z_$][\w$]*)|(\$?[A-Za-z_][\w$]*)(?=\s*:(?!:))/gm
const CLASSES = ['c', 's', 'n', 'k', 't', 'f', 'p', 'p']

export const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export function highlight(code: string): string {
  return escapeHtml(code).replace(TOKEN, (m, ...g) => {
    const i = g.findIndex((x, idx) => idx < CLASSES.length && x !== undefined)
    return i < 0 ? m : `<span class="${CLASSES[i]}">${m}</span>`
  })
}
