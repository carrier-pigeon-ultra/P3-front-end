export const environment = {
  production: true,
  withCredentials: true,
  baseUrl: "http://carrierpigeonultra-env.eba-rpgdxup3.us-east-2.elasticbeanstalk.com",
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': ['http://localhost:4200', "http://codepipeline-us-west-2-791209503483.s3-website-us-west-2.amazonaws.com"], 
  },
};
