using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookStore.Models
{
    public class CommonResponseDto
    {
        public string Message { get; set; }
        public bool Status { get; set; }
        public int MaxId { get; set; }
        public int StatusCode { get; set; }
    }
}
