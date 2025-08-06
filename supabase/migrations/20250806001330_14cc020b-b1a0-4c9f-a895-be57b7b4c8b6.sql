
-- Remove specific jewelry businesses and their associated data
DELETE FROM public.reviews WHERE business_id IN (
  SELECT id FROM public.businesses WHERE name IN (
    'Boston Fine Jewelry Appraisers',
    'Heritage Jewelry Appraisals', 
    'White Mountain Valuations',
    'Constitution State Valuations',
    'Pine Tree Jewelry Experts',
    'Ocean State Appraisals',
    'Gold Coast Appraisal Group',
    'Newport Jewelry Specialists',
    'Cambridge Gemological Institute',
    'Mystic River Appraisals',
    'Bay State Jewelry Evaluations',
    'Green Mountain Gemology',
    'Yale City Gemologists',
    'Coastal Appraisal Services',
    'Granite State Gemology'
  )
);

-- Remove quotes for these businesses
DELETE FROM public.quotes WHERE business_id IN (
  SELECT id FROM public.businesses WHERE name IN (
    'Boston Fine Jewelry Appraisers',
    'Heritage Jewelry Appraisals',
    'White Mountain Valuations', 
    'Constitution State Valuations',
    'Pine Tree Jewelry Experts',
    'Ocean State Appraisals',
    'Gold Coast Appraisal Group',
    'Newport Jewelry Specialists',
    'Cambridge Gemological Institute',
    'Mystic River Appraisals',
    'Bay State Jewelry Evaluations',
    'Green Mountain Gemology',
    'Yale City Gemologists',
    'Coastal Appraisal Services',
    'Granite State Gemology'
  )
);

-- Remove the jewelry businesses themselves
DELETE FROM public.businesses WHERE name IN (
  'Boston Fine Jewelry Appraisers',
  'Heritage Jewelry Appraisals',
  'White Mountain Valuations',
  'Constitution State Valuations', 
  'Pine Tree Jewelry Experts',
  'Ocean State Appraisals',
  'Gold Coast Appraisal Group',
  'Newport Jewelry Specialists',
  'Cambridge Gemological Institute',
  'Mystic River Appraisals',
  'Bay State Jewelry Evaluations',
  'Green Mountain Gemology',
  'Yale City Gemologists',
  'Coastal Appraisal Services',
  'Granite State Gemology'
);
