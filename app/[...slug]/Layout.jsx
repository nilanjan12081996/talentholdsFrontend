// app/[...slug]/layout.jsx
export default function PublicFormLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen flex items-center justify-center p-4">
        {/* This completely isolates the form and centers it. 
            No headers or footers will render here! */}
        <div className="w-full flex justify-center">
            {children}
        </div>
      </body>
    </html>
  );
}