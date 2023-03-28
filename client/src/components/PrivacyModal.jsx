import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export default function modal() {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md font-Rubik bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Privacy Notice
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Privacy Notice
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 font-Rubik">
                      Wrapped Plus uses the Spotify Web API to access your
                      Spotify profile. By using Wrapped Plus, you agree to the
                      use of your Spotify information as stated herein by this
                      policy. Data remains secure and is and never will be
                      shared with any third parties. Used Scopes enable the
                      application to access specific Spotify API endpoints. The
                      set of scopes that are required for you to access this
                      Application:
                      <br />
                      <br />
                      user-read-recently-played
                      <br />
                      user-top-read
                      <br />
                      playlist-modify-public
                      <br />
                      <br />
                      If at any point you wish to remove Wrapped Plus's
                      permissions to use your Spotify information, you can do so{" "}
                      <a
                        href="https://support.spotify.com/us/article/spotify-on-other-apps/"
                        target="_blank"
                        className="cursor-pointer text-blue-500"
                      >
                        here
                      </a>
                      .
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex font-Rubik justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
