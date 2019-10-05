import gql from 'graphql-tag';

function getQuery(name,extra?){
    extra = extra?extra:'';
    return `query {
        ${name}{
          id
          name
          description
          phone
          address
          largeDescription
          city {
            id
            name
            department {
              id
              name
              }
          }
          location
          image
          ${extra}
        },
        departments{
          id
          name
        },
        cities{
          id
          name
          department {
            id
            name
          }
        }
      }
      `;
}

export const TalleresQuery = gql(getQuery('talleres'));

export function getMutation(name,result,departmentId,cityId){
    let query = `mutation {
        ${name}(departmentId: "${departmentId}", cityId: "${cityId}") {
          ${result} {
             id
                name
                description
                phone
                address
                largeDescription
                city {
                  id
                  name
                  department {
                    id
                    name
                    }
                }
                location
                image
          }
        }
      }`
    return gql(query);
}

