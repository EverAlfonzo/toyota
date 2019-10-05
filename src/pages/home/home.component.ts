import gql from 'graphql-tag';

export class Company {

    constructor(
      public name: string = '',
      public description: string = '',
      public largeDescription: string = '',
      public phone: string = '',
      public address: string = '',
      public city: string = '',
      public location: string = '',
      public image: string = '',
      public specializations: Array<string>=[],
      public distance: number= 0
    ) {}

    
  }

export const QueryHome = gql`
{
    company {
      name
      description
      largeDescription
      phone
      address
      city
      location
      image
      imagesQty
      images
      
    }
  }
  
`;