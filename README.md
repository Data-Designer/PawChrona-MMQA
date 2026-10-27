# PawChrona-MMQA homepage / 数据集主页

Static, bilingual research homepage, hosted by GitHub Pages. Only website code, dataset-structure illustrations and aggregate dataset facts are in this repository. No raw research dataset, model, media shard, token or private path is uploaded. / GitHub Pages静态双语研究主页。仓库仅包含网站代码、数据结构示意图及汇总信息，不含原始研究数据、模型、分片、密钥或私有路径。

- Homepage: https://data-designer.github.io/PawChrona-MMQA/
- [Dataset overview / 数据说明](DATASET.md)

## Preview / 预览

```sh
python3 -m http.server 4186 --bind 127.0.0.1
```

Open `http://127.0.0.1:4186/`. No installation or build is needed; asset paths also support a GitHub project subpath and direct file opening. / 无需安装或构建，资源使用相对路径，兼容GitHub项目子路径与本地文件访问。

## Update / 更新

`release-data.js` is the public aggregate snapshot. Synchronize visible totals, configuration/category/species fields and `DATASET.md` when the source receipts change. A count is a parent-question count, not a language-row or media count. The source receipts are named without machine-local paths. / 同步汇总快照、页面数字与说明；父题不按语言或媒体重复计数，回执不公开本机路径。

An actual HF repository URL should only be added after upload, remote readback and an explicit release decision. Do not change review flags based on packaging or website checks. / 仅在真实上传、远程读回与发布确认后添加HF地址，打包或网页检查不提升审核状态。

Deploy the `main` branch root using GitHub Pages. `.nojekyll` keeps the site buildless. / GitHub Pages部署main分支根目录；`.nojekyll`免构建。

## Verification / 验证

`node scripts/verify.mjs` checks aggregate sums, relative assets, release gates and public-file exclusions. Browser interaction/layout QA is a separate DEBUG RUN, not a clinical or model evaluation. / 校验汇总求和、相对资源、发布状态与公开文件边界；浏览器交互测试不属于临床或模型实验。

## Dataset presentation and rights / 数据集展示与权利

This site presents the research dataset alone: its scope, configurations, bilingual field contract, provenance and review status. The header mark, schema diagram and social-preview graphic are dataset-specific code-native illustrations. They are not source examples or clinical validation evidence. / 本站只介绍研究数据集的规模、配置、双语字段、来源与审核状态。页首标识、记录结构图和分享预览图均为数据集专用的代码绘制示意，不是源样本或临床验证证据。

No third-party photographs, source media or unreviewed QA examples are displayed. The site has no analytics, outbound commercial links or embedded services. / 不展示第三方照片、源媒体或未审核问答样本；没有统计追踪、外部商业链接或嵌入服务。

Source material rights remain separate from authored annotations and this website. See [LICENSE](LICENSE). / 源素材、自编标注和网站代码的权利分别管理，参见许可说明。
