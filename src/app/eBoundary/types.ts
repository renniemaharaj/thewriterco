export type RecoveryFunction = {
  componentRoute: string;
  title: string;
  description: string;
};

export type ErrorBoundaryState = {
  recoveryFunctions: RecoveryFunction[];
};
