{
  /**
   * Print Loading State
   */
  type LoadingState = {
    state: 'loading';
  };

  type SuccessState = {
    state: 'success';
    response: {
      body: string;
    };
  };

  type FailState = {
    state: 'fail';
    reason: string;
  };

  type ResourceLoadState = LoadingState | SuccessState | FailState;

  function printLoginState(load: ResourceLoadState) {
    switch (load.state) {
      case 'loading':
        console.log(`👀 ${load.state}`);
        break;
      case 'success':
        console.log(`😃 ${load.response.body}`);
        break;
      case 'fail':
        console.log(`😱 ${load.reason}`);
        break;
      default:
        throw new Error(`unknown state: ${load}`);
    }
  }

  printLoginState({ state: 'loading' }); // 👀 loading...
  printLoginState({ state: 'success', response: { body: 'loaded' } }); // 😃 loaded
  printLoginState({ state: 'fail', reason: 'no network' }); // 😱 no network
}
