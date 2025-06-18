
export interface RelationshipIntentResults {
  timeline: string;
  commitment: string;
  lifeGoals: string;
  familyPlanning: string;
  relocatation: string;
}

export const calculateRelationshipIntentResults = (answers: Record<number, string>): RelationshipIntentResults => {
  const scores = {
    independent_casual: 0,
    relationship_ready: 0,
    partnership_focused: 0,
    deeply_committed: 0
  };

  // Analyze behavioral patterns from responses
  Object.values(answers).forEach(answer => {
    switch (answer) {
      // Independent/Casual patterns
      case 'independent_quick':
      case 'too_fast':
      case 'career_growth':
      case 'exciting_adventure':
      case 'deflect_humor':
      case 'eye_roll':
      case 'solo_activities':
      case 'avoid_withdraw':
        scores.independent_casual++;
        break;

      // Relationship Ready patterns  
      case 'consult_close':
      case 'depends_on_person':
      case 'adventure_exploration':
      case 'consider_connections':
      case 'explain_standards':
      case 'happy_but_distant':
      case 'friends_social':
      case 'address_directly':
        scores.relationship_ready++;
        break;

      // Partnership Focused patterns
      case 'prefer_partner_input':
      case 'romantic_ideal':
      case 'building_relationship':
      case 'discuss_with_partner':
      case 'share_hope':
      case 'genuinely_excited':
      case 'meaningful_connection':
      case 'work_through_patiently':
        scores.partnership_focused++;
        break;

      // Deeply Committed patterns
      case 'wait_for_partnership':
      case 'wish_that_were_me':
      case 'balanced_growth':
      case 'location_matters_less':
      case 'express_frustration':
      case 'longing_envy':
      case 'domestic_partnership':
      case 'committed_to_growth':
        scores.deeply_committed++;
        break;
    }
  });

  console.log('Relationship Intent behavioral scores:', scores);

  // Determine dominant pattern
  const dominantPattern = Object.entries(scores).reduce((a, b) => 
    scores[a[0] as keyof typeof scores] > scores[b[0] as keyof typeof scores] ? a : b
  )[0];

  // Map behavioral patterns to relationship characteristics
  const timeline = dominantPattern === 'independent_casual' ? 'within_year' :
                  dominantPattern === 'relationship_ready' ? '1_2_years' :
                  dominantPattern === 'partnership_focused' ? '1_2_years' :
                  'within_year';

  const commitment = dominantPattern === 'independent_casual' ? 'long_term_exclusive' :
                    dominantPattern === 'relationship_ready' ? 'life_partnership' :
                    dominantPattern === 'partnership_focused' ? 'life_partnership' :
                    'marriage';

  const lifeGoals = dominantPattern === 'independent_casual' ? 'career_first' :
                   dominantPattern === 'relationship_ready' ? 'balanced_approach' :
                   dominantPattern === 'partnership_focused' ? 'family_career' :
                   'family_focused';

  const familyPlanning = dominantPattern === 'independent_casual' ? 'maybe_children' :
                        dominantPattern === 'relationship_ready' ? 'maybe_children' :
                        dominantPattern === 'partnership_focused' ? 'want_children' :
                        'want_children';

  const relocation = dominantPattern === 'independent_casual' ? 'very_flexible' :
                    dominantPattern === 'relationship_ready' ? 'somewhat_flexible' :
                    dominantPattern === 'partnership_focused' ? 'somewhat_flexible' :
                    'location_committed';

  const results: RelationshipIntentResults = {
    timeline,
    commitment,
    lifeGoals,
    familyPlanning,
    relocatation: relocation
  };

  console.log('Final relationship intent results:', results);
  return results;
};
