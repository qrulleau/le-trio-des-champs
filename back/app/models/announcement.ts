import { AnnouncementSchema } from '#database/schema'

export default class Announcement extends AnnouncementSchema {
  static table = 'announcement'
}
