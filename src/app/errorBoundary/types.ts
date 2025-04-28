export type RecoveryFunction = {
  recover: () => void;
  componentRoute: string;
  title: string;
  description: string;
};

export type ErrorBoundaryState = {
  recoveryFunctions: RecoveryFunction[];
};
