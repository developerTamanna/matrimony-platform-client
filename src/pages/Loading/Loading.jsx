// src/components/Loading.jsx

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full border-4 border-lime-400 border-t-transparent animate-spin" />

        <div className="absolute inset-3 rounded-full border-4 border-lime-300 border-b-transparent animate-[spin_1.2s_linear_reverse_infinite]" />
      </div>
    </div>
  );
};

export default Loading;
