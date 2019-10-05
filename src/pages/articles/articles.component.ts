import gql from 'graphql-tag';

export class Article {
  
    constructor(
      public title: string = '',
      public content: string = '',
      public image: string = '',
    ) {}
  }

export const QueryArticles = gql`
  query {
    articles{
      title
      content
      image
    }
  }
`;