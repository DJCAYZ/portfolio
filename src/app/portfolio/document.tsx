"use client"

export function DocumentViewer() {
  return (
    <div className="w-full">
      <iframe className="w-full min-h-screen" src="https://docs.google.com/document/d/e/2PACX-1vQG1WVjIudXzZ35n_9bO0YvhcDzi8dmrMjwS7EfaX-zeBIv_EN5wixMMnZXPpa9t8tR4-GyPyiSAR5F/pub?embedded=true"></iframe>
      {/* <iframe className="w-full min-h-screen" src="https://docs.google.com/viewer?url=https://docs.google.com/document/d/1rImkg5nHUfJR9JAyuYtNr2KXZ1KmYQqOG6IHeBBuk0w"></iframe> */}
    </div>
  )
}