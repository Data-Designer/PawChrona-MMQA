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

| Broad category / 大类 | Questions / 题量 |
| --- | ---: |
| Behavior and expression / 行为与表达 | 20,013 |
| Disease and veterinary knowledge / 疾病与兽医知识 | 15,046 |
| Image interpretation / 图像解读 | 10,323 |
| Imaging basics and quality / 成像基础与质量 | 3,013 |
| Pet-health consultation / 宠物健康咨询 | 852 |

Species: 34,425 dog, 13,775 cat, 30 mixed cat/dog and 1,017 unknown. These are overall counts, not a modality-by-species cross-tab. Breeds require explicit source evidence and may be missing. / 物种全池数量：狗34,425、猫13,775、混合30、未知1,017；不是按模态细分的交叉计数。品种只按来源证据标记，允许缺失。

Preferred question formats: 35,864 MCQ4, 13,299 open and 84 native MCQ5. Existing open views are additional fields, not extra parent questions. / 默认题型：四选一35,864、开放题13,299、原生五选一84；备用开放视图不增加父题数。

## Native fields / 原生字段

`qa_id`, `species`, `broad_category`, `content_type`, `question_format`, paired `question_en`/`question_zh`, bilingual options and reference answers, `image`/`audio`/`video`, `media_sha256`, `source_ids`, source-reported breed evidence and explicit review/permission fields.

Image/audio/video bytes are planned in native HF Parquet features. English and Chinese share the same parent identifier. Answers, source labels and diagnostic roles are excluded from model inputs. / 采用HF原生Parquet媒体特征，中英文共享父题ID；模型输入排除答案、来源标签及诊断角色。

## Availability and review / 可用性与审核

This is a local unreviewed candidate, not a published dataset deposit. Native packaging is in preparation. The project has no verified public HF repository or DOI yet. This homepage repository distributes no raw dataset, media, source questions or patient records. / 当前是本地未审核候选，HF原生打包准备中；尚无确认的公开HF仓库或DOI。本主页仓库不分发原始数据、源媒体、源问题或个体病历。

All records remain `debug_only`. Actual veterinary reviews: 0. Clinical, independent privacy/language review and formal multimodal-model evaluation remain pending. No approved train/test release, clinical accuracy claim or leaderboard is provided. / 全部保持`debug_only`，真实兽医审核为0；临床、独立隐私/双语审核和正式多模态评估仍待完成，不提供获批训练/测试发布、临床准确率或排行榜。

## Provenance and rights / 出处与权利

Source links, original licence declarations, derivations and attribution are retained in the private working corpus. Those declarations do not resolve every asset's redistribution rights. The rights holder, creators and original-component licences are not finalized. No exclusive ownership of the reused corpus or completed IP registration is claimed. / 工作语料保留来源、原许可声明、加工和署名记录；这些声明不自动解决逐素材再分发权利。权利人、作者及自有组件许可未定稿，不主张复用语料的独占权或已完成知识产权登记。

Website code licensing does not relicense datasets, authored annotations or third-party material. / 网站代码许可不授予数据集、自编标注或第三方素材的新许可。
