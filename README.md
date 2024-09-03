# 🔍 Verify Remote Git Refs Equality 🔄

Enhance your repository mirroring process with this GitHub Action. It ensures that the references (refs) in your remote Git repositories are identical, preventing unnecessary clone-push cycles. Keep your mirrors up-to-date and synchronized efficiently.

## 📋 Description

This GitHub Action compares the references (refs) in two remote Git repositories to verify if they are equal. It helps you determine if a full clone-push cycle is necessary, ensuring your mirror remains up-to-date without unnecessary operations.

## ✨ Features

- **Efficient Synchronization**: Avoid unnecessary clone-push cycles.
- **Detailed Comparison**: Get detailed messages and type IDs for any differences found.
- **User-Friendly**: Easy to set up and use with clear input and output descriptions.

## 📦 Inputs and Outputs

| Input Name         | Description                                | Required |
|--------------------|--------------------------------------------|----------|
| `source-repo-url`  | Enter the URL of the source Git repository | Yes      |
| `target-repo-url`  | Enter the URL of the target Git repository | Yes      |

| Output Name        | Description                                                |
|--------------------|------------------------------------------------------------|
| `refs-differ`      | Indicates if the repositories have different references (true/false) |
| `diff-message`     | Details the differences found between repositories (if any) |
| `diff-type`        | Type ID categorizing the difference (if any)               |
| `source-repo-url`  | URL of the source Git repository (same as input)           |
| `target-repo-url`  | URL of the target Git repository (same as input)           |

## 🚀 Usage

To use this action in your workflow, add the following step:

```yaml
- name: "Verify Remote Git Refs Equality"
  id: 'verify-refs'
  uses: 'actions-rindeal/git-remote-ref-compare@master'
  with:
    'source-repo-url': 'https://github.com/source/repo.git'
    'target-repo-url': 'https://github.com/target/repo.git'

- name: "Mirror Repositories"
  if: ${{ steps['verify-refs'].outputs['refs-differ'] == 'true' }}
  # ...
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the _GPL-3.0-only OR GPL-2.0-only_ License. See the [LICENSE.md](./LICENSE.md) file for details.
