module.exports = {
  'query': {
    'bool': {
      'must': [{
        'constant_score': {
          'filter': {
            'multi_match': {
              'fields': ['name.default', 'name.en'],
              'analyzer': 'peliasQuery',
              'query': 'test',
              'boost': 100,
              'type': 'best_fields',
              'operator': 'and',
              'fuzziness': 1,
              'max_expansions': 40,
              'prefix_length': 1
            }
          }
        }
      }],
      'should': [{
        'function_score': {
          'query': {
            'match_all': {}
          },
          'max_boost': 20,
          'score_mode': 'first',
          'boost_mode': 'replace',
          'functions': [{
            'field_value_factor': {
              'modifier': 'log1p',
              'field': 'popularity',
              'missing': 1
            },
            'weight': 1
          }]
        }
      }, {
        'function_score': {
          'query': {
            'match_all': {}
          },
          'max_boost': 20,
          'score_mode': 'first',
          'boost_mode': 'replace',
          'functions': [{
            'field_value_factor': {
              'modifier': 'log1p',
              'field': 'population',
              'missing': 1
            },
            'weight': 3
          }]
        }
      }],
      'filter': [{
        'terms': {
          'category': ['retail', 'food']
        }
      }]
    }
  },
  'sort': ['_score'],
  'size': 20,
  'track_scores': true
};
