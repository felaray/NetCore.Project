namespace NetCore.Project.Models
{
    public class Todo
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime DeadLineDate { get; set; }

        public List<TodoFile> Files { get; set; }
    }

    public class TodoFile
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public DateTime CreatedDate { get; set; }
    }

}
