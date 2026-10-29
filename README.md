# PawChrona-MMQA homepage / 数据集主页

Static, bilingual research homepage, hosted by GitHub Pages. The repository contains website code, aggregate dataset facts, owner-supplied abbreviated QA examples, five explicitly selected development-set contact-sheet previews, dataset-specific graphics and a separately credited illustrative photograph. It does not distribute the full research dataset, individual original-media payloads, model, media shards, tokens or machine-local paths. / GitHub Pages静态双语研究主页，包含网站代码、汇总、负责人提供的简略问答、五张明确选定的开发集联系图、数据集专用图形与独立署名的场景照片；不分发完整研究数据集、单独的原始媒体载荷、模型、媒体分片、密钥或本机路径。

- Homepage: https://data-designer.github.io/PawChrona-MMQA/
- Dataset: https://huggingface.co/datasets/PawChrona/PawChrona-MMQA (manual-gated candidate / 需人工审批的候选)
- [Dataset overview / 数据说明](DATASET.md)

## Preview / 预览

```sh
python3 -m http.server 4186 --bind 127.0.0.1
```

Open `http://127.0.0.1:4186/`. No installation or build is needed; asset paths also support a GitHub project subpath and direct file opening. / 无需安装或构建，资源使用相对路径，兼容GitHub项目子路径与本地文件访问。

## Update / 更新

`release-data.js` is the public aggregate snapshot. Synchronize visible totals, configuration/category/species fields and `DATASET.md` when the source receipts change. A count is a parent-question count, not a language-row or media count. The source receipts are named without machine-local paths. / 同步汇总快照、页面数字与说明；父题不按语言或媒体重复计数，回执不公开本机路径。

The linked HF repository page is public, while dataset access uses manual approval (`gated: manual`), verified through its metadata API on 27 October 2026. Keep repository visibility, research-release readiness and clinical approval separate. Do not change review flags based on packaging or website checks. / 2026年10月27日通过HF元数据API核实：仓库页面可公开查看，数据访问需人工审批；仓库可见性、研究发布条件与临床放行分别管理，网页检查不提升审核状态。

Visitor dataset actions point to Hugging Face, not the GitHub source repository. The navigation and footer also link to the external evaluation leaderboard at https://pawchrona-team.azureraven20.chatgpt.site/?lang=zh. The GitHub Pages canonical address remains the homepage hosting location. / 访客的数据集入口均指向HF，不提供GitHub源码仓库入口；顶部导航和页脚提供外部评测榜单入口；GitHub Pages规范地址仍作为本站托管地址保留。

Deploy the `main` branch root using GitHub Pages. `.nojekyll` keeps the site buildless. / GitHub Pages部署main分支根目录；`.nojekyll`免构建。

## Verification / 验证

`node scripts/verify.mjs` checks aggregate sums, relative assets, release gates and public-file exclusions. Browser interaction/layout QA is a separate DEBUG RUN, not a clinical or model evaluation. / 校验汇总求和、相对资源、发布状态与公开文件边界；浏览器交互测试不属于临床或模型实验。

## Development contact sheets / 开发集联系图

The 28 October development partition (`2026.10.28-debug.2`) contains 2,500 parent questions: 500 in each of the same five content categories. It is a subset of the original 49,247, not an additional 2,500 images or an approved final test set. The full-pool statistics remain unchanged. / 10月28日开发集包含2,500道父题，五类各500题；它是原49,247题的子集，不是新增2,500张图片，也不是获批的最终测试集，全池统计不变。

The gallery supports category selection, full-view and original-size zoom, keyboard navigation and a mobile selector. The five JPGs are byte-identical copies of selected source contact sheets, with dimensions, counts and SHA-256 recorded in `assets/dataset-dev-preview.json`. Audio/video/text tiles retain their source placeholders; they are not broken images. Some categories include medical imagery. / 展区支持分类切换、放大与原尺寸查看、键盘操作及手机端选择器。五张JPG保留源联系图原始字节，尺寸、题量与哈希记录在清单中；音频、视频和文本格子保留源占位标记，不是图片缺失，部分分类包含医学图像。

To refresh from an explicitly selected local source directory and its aggregate report, run `node scripts/sync-dev-contact-sheets.mjs <contact-sheet-directory> <diversity-report.json>`. The script copies only the five named JPGs, never a whole research folder. Then synchronize `release-data.js`, bilingual copy and documentation, and run the verifier. / 刷新脚本只复制五张指定JPG，不递归上传研究目录；更新后同步快照、双语文案与文档，并运行校验。网页展示不改变兽医、临床、隐私或训练放行状态。

## Dataset presentation and rights / 数据集展示与权利

This site presents the research dataset alone: its content categories, bilingual QA, provenance and review status. The header mark and social-preview graphic are dataset-specific code-native illustrations, not source examples or clinical validation evidence. / 本站只介绍研究数据集的内容分类、双语问答、来源与审核状态。页首标识和分享预览图为数据集专用的代码绘制示意，不是源样本或临床验证证据。

The main statistics follow five content categories, each paired with an owner-supplied abbreviated QA example. Media/configuration counts are secondary technical details, collapsed by default. The five category counts sum to 49,247. / 主展示按五大内容分类，并配负责人提供的简略问答；模态配置降为默认折叠的技术详情，五类题量合计49,247。

Background photograph: “Cat and Dog Cuddling”, SeanT313, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/), [source page](https://commons.wikimedia.org/wiki/File:Cat_and_Dog_Cuddling.jpg). The file is copied without alterations and displayed with responsive cropping; it is an illustrative scene, not a dataset sample or emotional-state annotation. Credit is visible in the footer. / 背景照片仅为场景配图，不是数据集样本或情绪标注。保留原图，响应式裁切展示，署名位于页脚。

Source material rights remain separate from authored annotations and this website. See [LICENSE](LICENSE). / 源素材、自编标注和网站代码的权利分别管理，参见许可说明。


## Authors and citation / 作者与引用

Author and project rights attribution / 作者与项目权属署名：**PawChrona Team**.

Use [CITATION.cff](CITATION.cff) or [citation.bib](citation.bib) to cite the dataset. / 请使用上述引用文件引用数据集。

