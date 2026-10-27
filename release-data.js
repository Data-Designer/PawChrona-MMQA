// Public aggregate snapshot only. No source media, questions, patient records or local paths.
window.PAWCHRONA_RELEASE = Object.freeze({
  name: 'PawChrona-MMQA', version: '2026.10.27-debug.1', snapshotDate: '2026-10-27',
  status: 'gated_unreviewed_candidate', parentQuestions: 49247,
  configurations: {image_vqa:39360,audio_video_qa:9247,text_qa:640},
  categories: {behavior_and_expression:20013,disease_and_veterinary_knowledge:15046,image_interpretation:10323,imaging_basics_and_quality:3013,pet_health_consultation:852},
  species: {cat:13775,dog:34425,mixed_cat_dog:30,unknown:1017},
  formats: {mcq4:35864,open:13299,mcq5:84},
  sourceRecords:2171, sourceRecordsReferenced:2139,
  languages:['en','zh'], split:'debug_only',
  hfUrl:'https://huggingface.co/datasets/PawChrona/PawChrona-MMQA', hfAccessStatus:'gated_manual', hfMetadataVerified:true,
  publicUploadPerformed:false, clinicalApproved:false, privacyCleared:false,
  formalTrainingApproved:false, exportAllowed:false, actualVeterinarianReviews:0,
  sourceReceipts:['hf_publication_20261027_metadata_complete.json','vqa_release_20261026.json'],
  note:'Counts describe the local candidate, not approved public-release size or validated model performance.'
});
