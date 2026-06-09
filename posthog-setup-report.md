<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into Bodhi School of Yoga's Next.js application. A new `posthog-node` server-side client was installed and wired into all three API route handlers that represent the business's critical conversion pipeline. Every event uses the user's email as the `distinctId` so backend events stay correlated with each other. User identity properties (`$set`) are attached on `booking created`, `contact submitted`, and `lead created` so PostHog builds person profiles automatically. Exception capture is also wired into all three error boundaries.

The `BatchBookingDialog` component was updated to pass `email`, `courseName`, `amount`, and `currency` in the payment-status PATCH call so `payment completed` events share the same `distinctId` (email) as `booking created`.

| Event | Description | File |
|---|---|---|
| `booking created` | Fired after a course booking row is inserted in Supabase. Properties: `booking_id`, `course_name`, `batch`, `time_slot`, `amount`, `currency`. | `apps/web/src/app/api/bookings/route.ts` |
| `payment completed` | Fired when Razorpay confirms payment and booking status is updated to `paid`. Properties: `booking_id`, `payment_id`, `course_name`, `amount`, `currency`. | `apps/web/src/app/api/bookings/route.ts` |
| `contact submitted` | Fired when a contact enquiry form is saved. Properties: `first_name`, `has_phone`. | `apps/web/src/app/api/contact/route.ts` |
| `lead created` | Fired when a lead is successfully pushed to Kylas CRM. Properties: `course_name`, `batch`, `time_slot`, `crm`. | `apps/web/src/app/api/kylas/route.ts` |

## Next steps

We've built a dashboard and five insights for you to keep an eye on user behaviour, based on the events we just instrumented:

- [Analytics basics (wizard) — Dashboard](https://us.posthog.com/project/459295/dashboard/1683000)
- [Booking to Payment Conversion Funnel (wizard)](https://us.posthog.com/project/459295/insights/QhMo0Wfi)
- [Daily Bookings (wizard)](https://us.posthog.com/project/459295/insights/rSxO5ZiB)
- [Payments Completed (wizard)](https://us.posthog.com/project/459295/insights/8GgMIJuu)
- [Contact Enquiries (wizard)](https://us.posthog.com/project/459295/insights/O6X5CV9e)
- [Leads & Enquiries Overview (wizard)](https://us.posthog.com/project/459295/insights/FQvku6Tb)

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/integration-javascript_node/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
