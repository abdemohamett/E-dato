import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'E-dato',
  description: 'E-dato is all in one expenses, customer and debt management tool tha allows you to manage your data in an easy way.'
}

const LandingLayout = ({
    children
  }: {
    children: React.ReactNode;
  }) => {
    return (
      <main className="h-full overflow-auto">
        <div className="mx-auto max-w-screen-xl h-full w-full">
          {children}
        </div>
      </main>
     );
  }
   
  export default LandingLayout;