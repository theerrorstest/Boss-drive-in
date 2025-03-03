import SquareButton from "@/components/Button/SquareButton";
import staff_management from "@/public/staff_management.svg";
import daily_safe_balance_history from "@/public/daily_safe_balance_history.svg";
import employee_order_history from "@/public/employee_order_history.svg";

export default function Page() {
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-12 max-w-4xl">
        <SquareButton
          text="Staff Management"
          imageUrl={staff_management}
          redirectUrl="/admin/staff-management"
        />

        {/* Staff Login */}
        <SquareButton
          text="Daily Safe Balance History"
          imageUrl={daily_safe_balance_history}
          redirectUrl="/admin/daily-safe-balance"
        />
        <SquareButton
          text="Employee Order History"
          imageUrl={employee_order_history}
          redirectUrl="/admin/employee-order-history"
        />
      </div>
    </div>
  );
}
