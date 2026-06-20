export function DashboardStats({
  status,
  roomsCount,
  totalVideos,
  visibleRoomsCount,
  filtered,
}: {
  status: "available";
  roomsCount: number;
  totalVideos: number;
  visibleRoomsCount: number;
  filtered: boolean;
} | {
  status: "unavailable";
  roomsCount?: never;
  totalVideos?: never;
  visibleRoomsCount?: never;
  filtered?: never;
}) {
  if (status === "unavailable") {
    return (
      <section className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          ["Rooms", "Topic-based study spaces"],
          ["Video links", "Across every playlist"],
          ["Visible", "In your dashboard"],
        ].map(([label, detail]) => (
          <DashboardStat
            key={label}
            label={label}
            value="—"
            detail={`${detail} · Unavailable right now`}
          />
        ))}
      </section>
    );
  }

  return (
    <section className="mt-6 grid gap-3 sm:grid-cols-3">
      <DashboardStat
        label="Rooms"
        value={roomsCount.toString()}
        detail="Topic-based study spaces"
      />
      <DashboardStat
        label="Video links"
        value={totalVideos.toString()}
        detail="Across every playlist"
      />
      <DashboardStat
        label="Visible"
        value={visibleRoomsCount.toString()}
        detail={filtered ? "After filtering" : "In your dashboard"}
      />
    </section>
  );
}

function DashboardStat({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="border border-[#0d0d0c] bg-white p-4 shadow-[4px_4px_0_#f4ded0]">
      <p className="text-xs font-semibold uppercase tracking-normal text-[#0d0d0c]/48">
        {label}
      </p>
      <p className="mt-4 text-3xl font-semibold">{value}</p>
      <p className="mt-1 text-xs leading-5 text-[#0d0d0c]/56">{detail}</p>
    </div>
  );
}
