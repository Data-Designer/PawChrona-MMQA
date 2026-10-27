# PawChrona-MMQA homepage / 数据集主页

Static, bilingual research homepage, hosted by GitHub Pages. The repository contains website code, aggregate dataset facts, owner-supplied abbreviated QA examples, dataset-specific graphics and a separately credited illustrative photograph. No raw research dataset, model, media shard, token or private path is uploaded. / GitHub Pages静态双语研究主页，包含网站代码、汇总、负责人提供的简略问答、数据集专用图形与独立署名的场景照片，不含原始研究数据、模型、分片、密钥或私有路径。

- Homepage: https://data-designer.github.io/PawChrona-MMQA/
- Dataset: https://huggingface.co/datasets/ChuangZhao/PawChrona-MMQA (private candidate / 私有候选)
- [Dataset overview / 数据说明](DATASET.md)

## Preview / 预览

```sh
python3 -m http.server 4186 --bind 127.0.0.1
```

Open `http://127.0.0.1:4186/`. No installation or build is needed; asset paths also support a GitHub project subpath and direct file opening. / 无需安装或构建，资源使用相对路径，兼容GitHub项目子路径与本地文件访问。

## Update / 更新

`release-data.js` is the public aggregate snapshot. Synchronize visible totals, configuration/category/species fields and `DATASET.md` when the source receipts change. A count is a parent-question count, not a language-row or media count. The source receipts are named without machine-local paths. / 同步汇总快照、页面数字与说明；父题不按语言或媒体重复计数，回执不公开本机路径。

The linked HF repository has been verified as a private, unreviewed candidate. Keep access permissions, public-release readiness and clinical approval separate. Do not change review flags based on packaging or website checks. / 已核实HF仓库为私有、未审核候选；访问权限、公开发布条件与临床放行分别管理，网页检查不提升审核状态。

Deploy the `main` branch root using GitHub Pages. `.nojekyll` keeps the site buildless. / GitHub Pages部署main分支根目录；`.nojekyll`免构建。

## Verification / 验证

`node scripts/verify.mjs` checks aggregate sums, relative assets, release gates and public-file exclusions. Browser interaction/layout QA is a separate DEBUG RUN, not a clinical or model evaluation. / 校验汇总求和、相对资源、发布状态与公开文件边界；浏览器交互测试不属于临床或模型实验。

## Dataset presentation and rights / 数据集展示与权利

This site presents the research dataset alone: its content categories, bilingual QA, provenance and review status. The header mark and social-preview graphic are dataset-specific code-native illustrations, not source examples or clinical validation evidence. / 本站只介绍研究数据集的内容分类、双语问答、来源与审核状态。页首标识和分享预览图为数据集专用的代码绘制示意，不是源样本或临床验证证据。

The main statistics follow five content categories, each paired with an owner-supplied abbreviated QA example. Media/configuration counts are secondary technical details, collapsed by default. The five category counts sum to 49,247. / 主展示按五大内容分类，并配负责人提供的简略问答；模态配置降为默认折叠的技术详情，五类题量合计49,247。

Background photograph: “Cat and Dog Cuddling”, SeanT313, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/), [source page](https://commons.wikimedia.org/wiki/File:Cat_and_Dog_Cuddling.jpg). The file is copied without alterations and displayed with responsive cropping; it is an illustrative scene, not a dataset sample or emotional-state annotation. Credit is visible in the footer. / 背景照片仅为场景配图，不是数据集样本或情绪标注。保留原图，响应式裁切展示，署名位于页脚。

Source material rights remain separate from authored annotations and this website. See [LICENSE](LICENSE). / 源素材、自编标注和网站代码的权利分别管理，参见许可说明。
