import { handle } from "redux-pack";

const res = (data, timeout = 300) =>
  new Promise(resolve => setTimeout(() => resolve(data), timeout));
// const rej = (error, timeout = 300) =>
//   new Promise((resolve, reject) => setTimeout(() => reject(error), timeout));

const authors = [{ id: 1, firstName: "Alex" }, { id: 2, firstName: "Ivan" }];
const frameworks = [
  { id: 1, name: "React.js", authorId: 1 },
  { id: 2, name: "Vue.js", authorId: 2 },
  { id: 3, name: "GatsbyJS", authorId: 1 }
];

// constants
const GET_FRAMEWORK_LIST = "content/getFrameworks";

const initialState = {
  data: [],
  isLoading: true,
  error: null
};

export function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_FRAMEWORK_LIST:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isLoading: true,
          error: null
        }),
        finish: prevState => ({ ...prevState, isLoading: false }),
        failure: prevState => ({ ...prevState, error: payload }),
        success: prevState => ({ ...prevState, data: payload })
      });
    default:
      return state;
  }
}

// action creators
export const getFrameworks = () => ({
  type: GET_FRAMEWORK_LIST,
  promise: new Promise(async (resolve, reject) => {
    // frameworks, authors are dummy data
    const frameworksPromise = res(frameworks, 1000);
    const authorsPromise = res(authors);
    // example of failure request
    // const authorsPromise = rej(`Data haven't been loaded`, 1000);

    try {
      const [frameworksRes, authorsRes] = await Promise.all([
        frameworksPromise,
        authorsPromise
      ]);

      const frameworksWithAuthors = frameworksRes.map(framework => {
        const nextFramework = framework;
        nextFramework.author = authorsRes.find(
          author => author.id === nextFramework.authorId
        );
        delete nextFramework.authorId;
        return nextFramework;
      });
      resolve(frameworksWithAuthors);
    } catch (e) {
      reject(e);
    }
  })
});

export default reducer;
