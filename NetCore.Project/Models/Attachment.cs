namespace NetCore.Project.Models
{
    public class Attachment
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public string FileType { get; set; }
        public long FileSize { get; set; }
        public string Guid { get; set; }
        public bool Deleted { get; set; }
        public DateTime CreatedOn { get; set; }

        public int CaseId { get; set; }
    }
}
