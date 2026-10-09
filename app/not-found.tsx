import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center text-white bg-[#0B1320]">
      <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
      <p className="text-stone-300 mb-6">Could not find requested resource</p>
      <Link
        href="/"
        className="px-6 py-2.5 rounded-full bg-[#FF4F24] text-white font-semibold hover:bg-[#E53E14] transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}
