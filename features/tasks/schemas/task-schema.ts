import z from "zod";

export const taskSchema = z.object({
  title: z.string()
    .min(1, 'Enter the title.')
    .max(40, 'Title can be entered up to 40 characters.'),
  description: z.string()
    .min(1, 'Enter the description')
    .max(300, 'Description can be entered up to 300 characters'),
  timeRange: z.object({
    from: z.date(),
    to: z.date(),
  }),
  color: z.string()
}).refine((data) => data.timeRange.from < data.timeRange.to, {
  error: 'Start time must be before end time',
  path: ['timeRange.from']
});