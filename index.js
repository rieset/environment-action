const core = require('@actions/core');
const github = require('@actions/github');


try {
  // `who-to-greet` input defined in action metadata file
  const secrets = JSON.parse(core.getInput('secrets'));
  const env = Object.keys(core.getInput('env'));

  console.log(secrets);
  const updated = Object.keys(secrets)
    // .filter((key) => env.includes(key))
    .map((key) => {
      return `${key}<<EOF${secrets[key]}EOF`
    })

  console.log('Updated envs: ', updated.join(', '));
  //
  // // for (let secret of secrets) {
  // //
  // // }
  //
  //
  // // core.exportSecret()
  // console.log(`Hello ${secrets}!`);
  // console.log(`Hello ${env}!`);
  //
  // const time = (new Date()).toTimeString();
  core.setOutput("report", updated);
  // // Get the JSON webhook payload for the event that triggered the workflow
  // const payload = JSON.stringify(github.context.payload, undefined, 2)
  // console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
