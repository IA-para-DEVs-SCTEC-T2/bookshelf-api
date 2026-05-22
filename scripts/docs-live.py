#!/usr/bin/env python3
"""
docs-live.py — Gera o prompt de documentação viva a partir do git diff.
Equivalente ao docs-live.sh para ambientes Windows.
"""

from pathlib import Path
import subprocess
import sys

def run_git_command(args, cwd):
    result = subprocess.run(
        ["git"] + args,
        cwd=cwd,
        text=True,
        capture_output=True
    )
    if result.returncode != 0:
        print(result.stderr)
        sys.exit(result.returncode)
    return result.stdout.strip()

def main():
    # Encontra a raiz do repositório
    result = subprocess.run(
        ["git", "rev-parse", "--show-toplevel"],
        text=True,
        capture_output=True
    )
    if result.returncode != 0:
        print("Erro: não foi possível encontrar a raiz do repositório Git.")
        sys.exit(1)

    repo_root = Path(result.stdout.strip())
    template_path = repo_root / "docs/prompts/docs-live-update.md"
    output_path = repo_root / ".tmp/docs-live/docs-live.generated.md"

    if not template_path.exists():
        print(f"Erro: template não encontrado em {template_path}")
        sys.exit(1)

    working_diff  = run_git_command(["diff"], repo_root)
    staged_diff   = run_git_command(["diff", "--cached"], repo_root)
    working_files = run_git_command(["diff", "--name-only"], repo_root)
    staged_files  = run_git_command(["diff", "--cached", "--name-only"], repo_root)

    all_files = []
    for item in (working_files + "\n" + staged_files).splitlines():
        item = item.strip()
        if item and item not in all_files:
            all_files.append(item)

    git_diff = "\n\n".join(part for part in [working_diff, staged_diff] if part.strip())
    changed_files = "\n".join(all_files)

    if not git_diff.strip():
        print("Nenhuma mudança detectada pelo Git.")
        print("Altere algum arquivo antes de gerar a documentação viva.")
        sys.exit(0)

    content = template_path.read_text(encoding="utf-8")
    content = content.replace("{{CHANGED_FILES}}", changed_files)
    content = content.replace("{{GIT_DIFF}}", git_diff)

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(content, encoding="utf-8")

    print()
    print("Prompt gerado com sucesso:")
    print(str(output_path))
    print()
    print("Use este arquivo no Kiro para atualizar a documentação viva.")

if __name__ == "__main__":
    main()
