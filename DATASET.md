# PawChrona-MMQA

A bilingual multimodal question-answering resource for companion-animal health and behavior. / 面向伴侣动物健康与行为的中英双语多模态问答资源。

## Candidate scope / 候选范围

Snapshot: 2026-10-27. Candidate version: `2026.10.27-debug.1`.

| Configuration / 配置 | Parent questions / 父题 |
| --- | ---: |
| image_vqa | 39,360 |
| audio_video_qa | 9,247 |
| text_qa | 640 |
| Total / 合计 | 49,247 |

The total counts parents once, not each language or alternate question view. / 总数按父题去重，不把语言或备用题型重复计数。

| Broad category / 大类 | Questions / 题量 | Representative QA excerpt / 代表性问答摘要 |
| --- | ---: | --- |
| Image interpretation / 影像观察与判读 | 10,323 | “这张图像显示哪些发现？”→“中性粒细胞；巨噬细胞。” |
| Disease and veterinary knowledge / 疾病类别与兽医知识 | 15,046 | “根据来源标注，属于哪一皮肤病类别？”→“真菌感染。” |
| Pet-health consultation / 宠物健康咨询 | 852 | “小狗掉了一颗牙……需要去医院吗？”→“需要确认恒牙是否受损。” |
| Behavior and expression / 行为与表情 | 20,013 | “来源将图像标为哪一表情类别？”→“高兴（来源表情类别）。” |
| Imaging basics and quality / 成像基础与质量 | 3,013 | “哪一描述与来源质量标注一致？”→“来源质量状态：曝光不足。” |

These short excerpts were supplied by the dataset owner for homepage display. Source-reported expression categories are not independently verified emotional states. / 上述摘要由数据集负责人提供用于主页展示；来源的表情类别不等同于独立验证的情绪状态。

Species: 34,425 dog, 13,775 cat, 30 mixed cat/dog and 1,017 unknown. These are overall counts, not a modality-by-species cross-tab. Breeds require explicit source evidence and may be missing. / 物种全池数量：狗34,425、猫13,775、混合30、未知1,017；不是按模态细分的交叉计数。品种只按来源证据标记，允许缺失。

Preferred question formats: 35,864 MCQ4, 13,299 open and 84 native MCQ5. Existing open views are additional fields, not extra parent questions. / 默认题型：四选一35,864、开放题13,299、原生五选一84；备用开放视图不增加父题数。

## Development partition preview / 开发集预览

Version `2026.10.28-debug.2` introduces a 2,500-question development partition, sampled from the existing 49,247 parents, with 500 questions in each of the five broad categories. The homepage shows five original contact-sheet JPGs. This partition is not a final test set and does not add to the full-pool total. / 新开发分区从现有49,247道父题中选出2,500题，五大类各500题，主页展示五张原始联系图；不是最终测试集，不增加全池题量。

The development partition contains 1,894 image-linked, 333 audio-linked, 84 video-linked and 189 text-only questions. Each contact-sheet cell represents a question, not necessarily a distinct image. Audio/video/text cells use source-rendered placeholders. Some previews contain medical imagery. / 开发集含图像关联1,894题、音频333题、视频84题和纯文本189题；每格代表一题，不一定是一张独立图片。非图像格子保留源渲染占位，部分预览包含医学图像。

Species in this partition: 1,052 cat, 1,248 dog, 30 mixed and 170 unknown. Preview assets are byte-identical to the selected source contact sheets; hashes and aggregate counts are in `assets/dataset-dev-preview.json`. The preview does not distribute per-question JSONL/Parquet, answer keys or individual media payloads. / 开发集物种为猫1,052、狗1,248、混合30、未知170；联系图与指定源文件字节一致，清单记录哈希和统计，不分发逐题JSONL/Parquet、答案表或独立媒体载荷。

## Native fields / 原生字段

`qa_id`, `species`, `broad_category`, `content_type`, `question_format`, paired `question_en`/`question_zh`, bilingual options and reference answers, `image`/`audio`/`video`, `media_sha256`, `source_ids`, source-reported breed evidence and explicit review/permission fields.

Image/audio/video bytes are planned in native HF Parquet features. English and Chinese share the same parent identifier. Answers, source labels and diagnostic roles are excluded from model inputs. / 采用HF原生Parquet媒体特征，中英文共享父题ID；模型输入排除答案、来源标签及诊断角色。

## Availability and review / 可用性与审核

The candidate is hosted at [PawChrona/PawChrona-MMQA](https://huggingface.co/datasets/PawChrona/PawChrona-MMQA). Verified on 27–28 October 2026: the repository page is public, while dataset access requires a request and manual approval (`gated: manual`). Repository visibility does not establish clinical or formal train/test approval. No DOI is assigned. This homepage distributes aggregate facts, owner-supplied representative QA excerpts and the five selected contact-sheet previews, not individual original media or patient records. / 候选版本位于上述HF组织仓库。2026年10月27–28日已核实：仓库页面可公开查看，数据访问需提交申请并经人工审批。仓库可见不代表已获临床或正式训练/测试放行，尚无DOI。本主页展示汇总、负责人提供的代表性问答和五张指定联系图，不分发独立原始媒体或个体病历。

All records remain unreviewed research candidates. The new `dev` partition is an organization label, not a review or clinical approval. Actual veterinary reviews: 0. Clinical, independent privacy/language review and formal multimodal-model evaluation remain pending. No approved train/test release, clinical accuracy claim or leaderboard is provided. / 全部仍为未审核研究候选；新`dev`分区只是组织标签，不代表审核或临床放行。真实兽医审核为0；临床、独立隐私/双语审核和正式多模态评估仍待完成，不提供获批训练/测试发布、临床准确率或排行榜。

## Provenance and rights / 出处与权利

Project authorship and rights attribution: **PawChrona Team**. Source links, original licence declarations, derivations and attribution are retained in the private working corpus. Those declarations do not resolve every asset's redistribution rights. The contribution/title chain and original-component licences are not finalized. No exclusive ownership of the reused corpus or completed IP registration is claimed. / 项目作者与权属署名为 **PawChrona Team**。工作语料保留来源、原许可声明、加工和署名记录；这些声明不自动解决逐素材再分发权利。贡献／权属链及自有组件许可未定稿，不主张复用语料的独占权或已完成知识产权登记。

Website code licensing does not relicense datasets, authored annotations or third-party material. / 网站代码许可不授予数据集、自编标注或第三方素材的新许可。

