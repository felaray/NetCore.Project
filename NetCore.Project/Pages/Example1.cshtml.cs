using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace NetCore.Project.Pages
{
    public class Example1Model : PageModel
    {
        private readonly ILogger<Example1Model> _logger;

        public Example1Model(ILogger<Example1Model> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {

        }
    }
}