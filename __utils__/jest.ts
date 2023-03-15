/**
 * Prevents jest from logging thrown errors
 */
export const muteErrors = () => {
  const realError = console.error;
  beforeEach(() => {
    console.error = jest.fn();
  });
  afterEach(() => {
    console.error = realError;
  });

  return realError;
};
